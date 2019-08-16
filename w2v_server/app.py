from gunicorn import __version__
import json
from compare import compare



def app(environ, start_response):
    if environ['REQUEST_METHOD'].upper() != 'POST':
        data = b'Invalid Request'
    else:
        data = environ['wsgi.input'].read()
    ans = json.loads(data)
    status = '200 OK'
    similarity = str(compare(list(ans.values())[0], list(ans.values())[1]))
    response_headers = [
        ('Content-type', 'text/plain'),
        ('Content-Length', str(len(data))),
        ('X-Gunicorn-Version', __version__)
    ]
    start_response(status, response_headers)
    return [similarity.encode('utf-8')]