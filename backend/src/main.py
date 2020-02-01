# coding=utf-8
from flask import Flask, jsonify, request
from .entities.entity import Session, engine, Base
from .entities.Deadletters import DeadLetterList, DeadLetterSchema
from flask_cors import CORS



# creating the flask application

app = Flask(__name__)
CORS(app)


# if needed, generate database schema
Base.metadata.create_all(engine)

@app.route('/dead_letter')
def get_LetterTables():
    # fetching from the database
    session = Session()
    letters_objects = session.query(DeadLetterList)

    # transforming into JSON-serializable objects
    schema = DeadLetterSchema(many=True)
    dead_letter = schema.dump(letters_objects)


     # serializing as JSON
    session.close()
    return jsonify(dead_letter)





@app.route('/dead_letter', methods=['GET'])
def add_LetterTable():
    # mount letters object
    posted_LetterTable = DeadLetterSchema(only=('title','description'))\
       .load(request.get_json())


    LetterTable = DeadLetterList(**posted_LetterTable, created_by="HTTP post request")

    #persist lette
    session = Session()
    session.add(LetterTable)
    session.commit()

    #return created letters

    new_LetterTable = DeadLetterSchema().dump(LetterTable)
    session.close()
    return jsonify(new_LetterTable), 201




@app.route('/dead_letter/<deadletterId>', methods=['DELETE'])

def delete_Letter(deadletterId):
    session = Session()
    letter = session.query(DeadLetterList).filter_by(id=deadletterId).first()
    session.delete(letter)
    session.commit()
    session.close()
    return '', 201
