import json
from kafka import KafkaConsumer, KafkaProducer

# Inicijalizacija Kafka potrošača i proizvođača
consumer = KafkaConsumer('topic1', bootstrap_servers='localhost:9092', group_id='my-group')
producer = KafkaProducer(bootstrap_servers='localhost:9092', acks='all')

# Definisanje Kafka tema za ulazne i izlazne podatke
input_topic = 'topic1'
output_topic = 'topic2'

def temperatureInC(json_data):
    data = json.loads(json_data)
    
    temperature = data['main']['temp']
    temperature = round(temperature - 273.15, 2)
    return temperature

# Funkcija za obradu primljenih podataka
def process_data(data):
    # Ovde bi trebalo da bude logika za obradu podataka
    # U ovom primeru, jednostavno ćemo dodati prefiks "Processed: " na originalni podatak
    processed_data = temperatureInC(data)
    return str(processed_data)

# Čitanje i obrada poruka iz ulazne Kafka teme
for message in consumer:
    # Dekodiranje poruke
    data = message.value.decode('utf-8')
    print(f"Received data: {data}")
    # Obrada podataka
    processed_data = process_data(data)
    
    # Slanje obrađenih podataka na izlaznu Kafka temu
    producer.send(output_topic, value=processed_data.encode('utf-8'))
    
    # Ispis obrađenih podataka
    print(f"Processed data: {processed_data}")

# Zatvaranje Kafka potrošača i proizvođača
consumer.close()
producer.close()
