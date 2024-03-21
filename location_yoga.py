import os
import googlemaps
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
    
def search_nearby_yoga_places(user_location):
    try:
        places_result = gmaps.places_nearby(location=user_location, radius=2500, keyword='yoga')
        places = []
        for place in places_result['results']:
            if 'photos' in place:
                photo_reference = place['photos'][0]['photo_reference']
                photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key=AIzaSyCYcHknfiD3Mj7qm5bKSkxuKFWoUtR71Go"
            else:
                photo_url = "https://example.com/default_yoga_image.jpg"  # Use a default image if no photo available

            # Generate random price between 500 and 1000
            price = f"Hourly Price:  ₹{random.randint(500, 1000)}"

            # Generate random rating between 1 and 5
            rating = f"Rating: {random.uniform(1, 5):.1f}"

            places.append({
                'name': place['name'],
                'price': price,
                'rating': rating,
                'location': place['vicinity'],
                'image': photo_url
            })
        return places
    except Exception as e:
        print("Error searching for nearby yoga places:", e)
        return None
def main():
    user_location = get_user_location()
    if user_location:
        places = search_nearby_yoga_places(user_location)
        if places:
            # Render HTML using Jinja2 template
            env = Environment(loader=FileSystemLoader('templates'))
            template = env.get_template('yoga_template.html')
            rendered_html = template.render(places=places)

            # Write the file to the templates directory with UTF-8 encoding
            file_path = os.path.join(os.getcwd(), 'templates', 'yoga.html')
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(rendered_html)

            print("File saved successfully at:", file_path)
        else:
            print("No nearby Yoga Studio found.")
    else:
        print("Unable to determine user location.")

if __name__ == "__main__":
    main()
