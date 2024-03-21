import os
import googlemaps
import webbrowser
from jinja2 import Environment, FileSystemLoader
import random

gmaps = googlemaps.Client(key='AIzaSyCYcHknfiD3Mj7qm5bKSkxuKFWoUtR71Go')

def get_user_location():
    try:
        result = gmaps.geolocate()
        user_location = (result['location']['lat'], result['location']['lng'])
        return user_location
    except Exception as e:
        print("Error getting user location:", e)
        return None
    
def search_nearby_football_facilities(user_location):
    try:
        places_result = gmaps.places_nearby(location=user_location, radius=2500, keyword='football field')
        football_facilities = []
        for place in places_result['results']:
            if 'photos' in place:
                photo_reference = place['photos'][0]['photo_reference']
                photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key=AIzaSyCYcHknfiD3Mj7qm5bKSkxuKFWoUtR71Go"
            else:
                photo_url = "https://example.com/default_football_image.jpg"  # Use a default image if no photo available

            # Generate random price between 500 and 1000
            price = f"Hourly Price: ₹{random.randint(500, 1000)}"

            # Generate random rating between 1 and 5
            rating = f"Rating: {random.uniform(1, 5):.1f}"

            football_facilities.append({
                'name': place['name'],
                'price': price,
                'rating': rating,
                'location': place['vicinity'],
                'image': photo_url
            })
        return football_facilities
    except Exception as e:
        print("Error searching for nearby football facilities:", e)
        return None


def main():
    user_location = get_user_location()
    if user_location:
        football_facilities = search_nearby_football_facilities(user_location)
        if football_facilities:
            # Render HTML using Jinja2 template
            env = Environment(loader=FileSystemLoader('templates')) 
            template = env.get_template('football_template.html')
            rendered_html = template.render(footballTurfs=football_facilities)

            # Write the file to templates directory
            file_path = os.path.join('templates', 'football.html')
            with open(file_path, 'w', encoding='utf-8') as f: 
                f.write(rendered_html)

            print("File saved successfully at:", file_path)
        else:
            print("No nearby football facilities found.")
    else:
        print("Unable to determine user location.")

if __name__ == "__main__":
    main()
