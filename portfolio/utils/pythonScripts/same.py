import json
import re
from itertools import islice

# open the input and output files
with open('aa.json') as f_in, open('output.json', 'w') as f_out:
    # process the input data in batches of 1000 lines
    for lines in iter(lambda: list(islice(f_in, 1000)), []):
        # parse the JSON data and convert it to the new format
        for line in lines:
            msg = json.loads(line)
            timestamp_str, sender_msg = re.findall('\[(.*?)\] (.*): (.*)', msg['message'])[0][0:2]
            new_msg = {
                'sender': sender_msg,
                'message': re.sub('\[(.*?)\] (.*): ', '', msg['message']),
                'timestamp': timestamp_str.replace('/', '-').replace(',', '') + 'Z',
                'attachments': {}
            }
            # write the new message to the output file
            f_out.write(json.dumps(new_msg) + '\n')
