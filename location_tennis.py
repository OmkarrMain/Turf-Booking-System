import os
import googlemaps
from jinja2 import Environment, FileSystemLoader
import random

# Initialize Google Maps API client
gmaps = googlemaps.Client(key='AIzaSyCYcHknfiD3Mj7qm5bKSkxuKFWoUtR71Go') 

def get_user_location():
    """Get user's current location."""
    try:
        result = gmaps.geolocate()
        user_location = (result['location']['lat'], result['location']['lng'])
        return user_location
    except Exception as e:
        print("Error getting user location:", e)
        return None
    
def search_nearby_tennis_courts(user_location):
    """Search for nearby tennis courts."""
    try:
        places_result = gmaps.places_nearby(location=user_location, radius=2500, keyword='tennis court')
        tennis_courts = []
        for place in places_result.get('results', []):  
            if 'photos' in place:
                photo_reference = place['photos'][0]['photo_reference']
                photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key=AIzaSyCYcHknfiD3Mj7qm5bKSkxuKFWoUtR71Go"
            else:
                photo_url = "https://example.com/default_tennis_image.jpg"  

            price = f"Hourly Price: ₹{random.randint(500, 1000)}"
            rating = f"Rating: {random.uniform(1, 5):.1f}"

            tennis_courts.append({
                'name': place.get('name', 'Unknown'),
                'price': price,
                'rating': rating,
                'location': place.get('vicinity', 'Location not available'),
                'image': photo_url
            })
        return tennis_courts
    except Exception as e:
        print("Error searching for nearby tennis courts:", e)
        return None

def main():
    """Main function to execute the script."""
    user_location = get_user_location()
    if user_location:
        tennis_courts = search_nearby_tennis_courts(user_location)
        if tennis_courts:
            # Render HTML using Jinja2 template
            env = Environment(loader=FileSystemLoader('templates'))
            template = env.get_template('tennis_template.html')
            rendered_html = template.render(places=tennis_courts)  

            # Write the HTML to a file
            file_path = os.path.join('templates', 'tennis.html')
            with open(file_path, 'w', encoding='utf-8') as f:  
                f.write(rendered_html)

            print("File saved successfully at:", file_path)
        else:
            print("No nearby tennis courts found.")
    else:
        print("Unable to determine user location.")

if __name__ == "__main__":
    main()
