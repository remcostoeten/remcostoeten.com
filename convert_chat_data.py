import json
from datetime import datetime

with open('znew.json', 'r', encoding='iso-8859-1') as f:
    chat_data = json.load(f)

new_chat_data = []
for message in chat_data['chat']:
    try:
        timestamp_str, sender_text = message['message'].split('] ', 1)
        timestamp = datetime.strptime(timestamp_str[1:], '%d/%m/%Y, %H:%M:%S')
        new_chat_data.append({
            'id': message.get('id', ''),
            'sender': sender_text.split(': ')[0],
            'text': sender_text.split(': ')[1],
            'timestamp': timestamp.timestamp()
        })
    except ValueError:
        # Ignore messages with invalid timestamp format
        pass

with open('znewpy.json', 'w') as f:
    json.dump(new_chat_data, f)
