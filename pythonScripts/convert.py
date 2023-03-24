import json

# Read the text file
with open('filename.txt', 'r', encoding='utf-8') as file:
    text = file.read().encode('utf-8')

# Split the text into lines
lines = text.split(b'\n')

# Create an empty list to store the messages
messages = []

# Loop over each line and extract the data
for line in lines:
    # Extract the timestamp, name, and message from the line if possible
    parts = line.decode('utf-8').split(' ')
    if len(parts) >= 2:
        timestamp, name, *message_parts = parts

        # Join the message parts back together into a single string
        message = ' '.join(message_parts)

        # Create a new message dictionary and add it to the list
        messages.append({
            'timestamp': timestamp,
            'name': name.replace(':', ''),
            'message': message,
            'image': ''
        })

# Convert the messages list to JSON and write it to a file
with open('messages.json', 'w') as file:
    json.dump(messages, file)