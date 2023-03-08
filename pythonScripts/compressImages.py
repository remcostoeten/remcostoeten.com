from PIL import Image
import os

# Maak een nieuwe map voor gecomprimeerde afbeeldingen
if not os.path.exists("compressed"):
    os.mkdir("compressed")

# Loop door alle afbeeldingen in de map en comprimeer ze
for filename in os.listdir("."):
    if filename.endswith(".jpg"):
        with Image.open(filename) as img:
            # Comprimeer de afbeelding en sla deze op in de nieuwe map
            img.save("compressed/" + filename, optimize=True, quality=85)
            print("Compressed", filename)
