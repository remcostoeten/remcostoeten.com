import json

variables = ["timestamp", "name", "message", "image"]
data = []

with open("chat_history.txt", "r", encoding="utf8") as file:
    for line in file:
        try:
            timestamp, message = line.split("] ")
            timestamp = timestamp[1:]
            name, message = message.split(": ", 1)
            if "<attached:" in line:
                image = line.split(": ")[-1][:-1]
                message = ""
            else:
                image = ""
                message = message.strip()
            data.append({"timestamp": timestamp, "name": name, "message": message, "image": image})
        except ValueError:
            # skip lines that don't match expected format
            continue

with open("whatsapp.json", "w") as file:
    json.dump(data, file)
