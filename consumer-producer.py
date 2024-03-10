import json
from kafka import KafkaConsumer, KafkaProducer

consumer = KafkaConsumer('topic1', bootstrap_servers='localhost:9092', group_id='my-group')
producer = KafkaProducer(bootstrap_servers='localhost:9092', acks='all')

input_topic = 'topic1'
output_topic = 'topic2'

def temperatureInC(json_data):
    data = json.loads(json_data)
    
    temperature = data['main']['temp']
    temperature = round(temperature - 273.15, 2)
    return temperature

def process_data(data):
    processed_data = temperatureInC(data)
    return str(processed_data)

for message in consumer:
    data = message.value.decode('utf-8')
    processed_data = process_data(data)
    
    producer.send(output_topic, value=processed_data.encode('utf-8'))
    
    print(f"Processed data: {processed_data}")

consumer.close()
producer.close()
