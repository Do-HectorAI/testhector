#!/usr/bin/env python3
"""
Petit serveur local pour la maquette.

Pourquoi ne pas utiliser `python3 -m http.server` ?
Parce qu'il ne gère pas les requêtes HTTP « Range » (lecture par morceaux).
Safari refuse de lire une vidéo servie sans ce support : le hero reste figé
sur son image fixe. Ce script ajoute ce qui manque.

Usage :
    python3 serve.py          # http://localhost:8000
    python3 serve.py 8080     # sur un autre port

(Sur GitHub Pages, Netlify ou Vercel, le problème ne se pose pas :
leurs serveurs gèrent les Range nativement.)
"""

import http.server
import os
import re
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.dirname(os.path.abspath(__file__))


class RangeHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def send_head(self):
        rng = self.headers.get('Range')
        if not rng:
            return super().send_head()

        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()

        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, 'File not found')
            return None

        size = os.fstat(f.fileno()).st_size
        m = re.match(r'bytes=(\d*)-(\d*)$', rng.strip())
        if not m:
            f.close()
            self.send_error(400, 'Invalid Range')
            return None

        start_s, end_s = m.groups()
        if start_s == '':                       # bytes=-500 : les 500 derniers octets
            length = int(end_s)
            start = max(0, size - length)
            end = size - 1
        else:
            start = int(start_s)
            end = int(end_s) if end_s else size - 1

        if start >= size:
            f.close()
            self.send_response(416, 'Requested Range Not Satisfiable')
            self.send_header('Content-Range', 'bytes */%d' % size)
            self.end_headers()
            return None

        end = min(end, size - 1)

        self.send_response(206, 'Partial Content')
        self.send_header('Content-Type', self.guess_type(path))
        self.send_header('Content-Range', 'bytes %d-%d/%d' % (start, end, size))
        self.send_header('Content-Length', str(end - start + 1))
        self.end_headers()

        f.seek(start)
        self.remaining = end - start + 1
        return f

    def copyfile(self, source, outputfile):
        remaining = getattr(self, 'remaining', None)
        if remaining is None:
            return super().copyfile(source, outputfile)
        self.remaining = None
        while remaining > 0:
            chunk = source.read(min(64 * 1024, remaining))
            if not chunk:
                break
            outputfile.write(chunk)
            remaining -= len(chunk)


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == '__main__':
    with Server(('127.0.0.1', PORT), RangeHandler) as httpd:
        print('Maquette Hector servie sur http://localhost:%d' % PORT)
        print('Ctrl+C pour arrêter.')
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nArrêté.')
