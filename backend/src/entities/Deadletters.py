# coding=utf-8

from sqlalchemy import BigInteger, Column, DateTime, Integer, String, Text
from marshmallow import Schema, fields
from .entity import Base
from sqlalchemy.sql import func




class DeadLetterList(Base):
    __tablename__ = 'dead_letter'

    id = Column(Integer, primary_key=True)
    created_at = Column('created_at', DateTime, server_default=func.now())
    topic = Column(String)
    partition = Column(Integer)
    offset = Column(Integer)
    timestamp = Column(BigInteger)
    key = Column(String)
    value = Column(Text)
    decoded_value = Column(Text)
    headers = Column(String)
    checksum = Column(String)
    serialized_key_size = Column(Integer)
    serialized_value_size = Column(Integer)
    serialized_header_size = Column(Integer)
    log = Column(Text)
    schema = Column(String)

    def __init__(self, message, exception):
        self.topic = message.topic
        self.partition = message.partition
        self.offset = message.offset
        self.timestamp = message.timestamp
        self.key = message.key
        self.value = message.value
        self.headers = message.headers
        self.checksum = message.checksum
        self.serialized_key_size = message.serialized_key_size
        self.serialized_value_size = message.serialized_value_size
        self.serialized_header_size = message.serialized_header_size
        self.schema = None
        self.log = repr(exception)




class DeadLetterSchema(Schema):
    id = fields.Number()
    created_at = fields.DateTime()
    topic = fields.Str()
    partition = fields.Number()
    offset = fields.Number()
    timestamp = fields.Number()
    key = fields.Str()
    value = fields.Str()
    decoded_value =fields.Str()
    headers = fields.Str()
    checksum = fields.Str()
    serialized_key_size = fields.Number()
    serialized_value_size = fields.Number()
    serialized_header_size = fields.Number()
    log = fields.Str()
    schema = fields.Str()
