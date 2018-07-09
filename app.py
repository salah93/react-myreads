'''
simple app demonstrating CRUD
'''
import json
from bson.json_util import dumps
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from pymongo import MongoClient

# Create connection to MongoDB
client = MongoClient('localhost', 27017)
collection = client['books']['books']

app = Flask(__name__)
CORS(app)


@app.route('/')
@app.route('/search')
def home():
    return render_template('index.html')


@app.route('/books.json')
def getAll():
    books = collection.find()
    return jsonify(dumps(books))


@app.route('/update/books.json/<title>', methods=['PUT'])
def update(title):
    data = request.data.decode('utf-8')
    new_shelf = json.loads(data)['shelf']
    print(new_shelf)
    res = collection.update_one(
        {'Title': title},
        {'$set': {'shelf': new_shelf}})
    if res.modified_count > 0:
        return jsonify({'success': True})
    else:
        return jsonify({"success": False})


@app.route('/search/books.json')
def search():
    query = request.args.get('query').strip()
    books = collection.find({'$or': [
        {'Title': {'$regex': '.*%s.*' % query, '$options': 'i'}},
        {'authors': {'$regex': '.*%s.*' % query, '$options': 'i'}}
    ]})
    return jsonify(dumps(books))


if __name__ == '__main__':
    app.secret_key = 'ajsfdkilSDAFL'
    params = dict(debug=True, host='localhost')
    app.run(**params)
