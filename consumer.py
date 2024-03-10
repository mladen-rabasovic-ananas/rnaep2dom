from kafka import KafkaConsumer
import requests, json

# Initialize Kafka consumer
consumer = KafkaConsumer('topic2', bootstrap_servers='localhost:8000', group_id='my-group')

# Initialize Node.js server endpoint
nodejs_server_url = 'http://localhost:8000/api/receive-data'

# Read and process messages from the Kafka topic
for message in consumer:
    # Decode and load JSON data from the Kafka message
    print(message.value);
    value_string = message.value.decode('utf-8')
    # weather_data = message.value.decode('utf-8')
    # weather_data_json = json.loads(weather_data)
    
    # # Send data to Node.js server
    response = requests.post(nodejs_server_url, data=value_string)
    
    # # Print the response from the Node.js server
    print(f"Response from Node.js server: {response.text}")

# Close the consumer (this part will not be reached in this example)
consumer.close()
