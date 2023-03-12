import json

# Open the input file and read in the JSON data
with open('input.json', 'r') as f:
    json_data = f.read()

# Split the JSON data into individual lines
lines = json_data.strip().split('\n')

# Iterate over each line of JSON data
for i, line in enumerate(lines):
    try:
        # Parse the JSON data on this line
        json_obj = json.loads(line)
        
        # Remove the extra quotation mark from the "name" field
        json_obj['name'] = json_obj['name'].rstrip('"')
        
        # Convert the JSON object back to a string and replace the original line
        lines[i] = json.dumps(json_obj)
    except json.decoder.JSONDecodeError:
        print(f"Error decoding JSON on line {i+1}")

# Join the corrected JSON lines back together and write to a new file
with open('output.json', 'w') as f:
    f.write('\n'.join(lines))
