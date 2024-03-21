import os
import googlemaps
from jinja2 import Environment, FileSystemLoader
import random

# Initialize Google Maps API client
gmaps = googlemaps.Client(key='AIzaSyCYcHknfiD3Mj7qm5bKSkxuKFWoUtR71Go')  # Replace 'YOUR_API_KEY_HERE' with your actual API key

def get_user_location():
    """Get user's current location."""
    try:
        result = gmaps.geolocate()
        user_location = (result['location']['lat'], result['location']['lng'])
        return user_location
    except Exception as e:
        print("Error getting user location:", e)
        return None

def search_nearby_turfs(user_location):
    """Search for nearby sports turfs."""
    try:
        places_result = gmaps.places_nearby(location=user_location, radius=2500, keyword='sports facility')
        turfs = []
        for place in places_result.get('results', []):  # Use .get() to handle cases where 'results' key is missing
            if 'photos' in place:
                photo_reference = place['photos'][0]['photo_reference']
                photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key=AIzaSyCYcHknfiD3Mj7qm5bKSkxuKFWoUtR71Go" 
            else:
                photo_url = "https://example.com/default_turf_image.jpg"  # Use a default image if no photo available

            # Generate random price between 500 and 1000
            price = f"Hourly Price: ₹{random.randint(500, 1000)}"

            # Generate random rating between 1 and 5
            rating = f"Rating: {random.uniform(1, 5):.1f}"

            turfs.append({
                'name': place.get('name', 'Unknown'),
                'price': price,
                'rating': rating,
                'location': place.get('vicinity', 'Location not available'),
                'image': photo_url
            })
        return turfs
    except Exception as e:
        print("Error searching for nearby turfs:", e)
        return None

def main():
    """Main function to execute the script."""
    user_location = get_user_location()
    if user_location:
        turfs = search_nearby_turfs(user_location)
        if turfs:
            # Render HTML using Jinja2 template
            env = Environment(loader=FileSystemLoader('templates'))  # Assuming templates directory exists
            template = env.get_template('cricket_template.html')  # Correct template file name
            rendered_html = template.render(turfs=turfs)

            # Write the HTML to a file
            file_path = os.path.join('templates', 'cricket.html')
            with open(file_path, 'w', encoding='utf-8') as f:  # Specify UTF-8 encoding
                f.write(rendered_html)

            print("File saved successfully at:", file_path)
        else:
            print("No nearby turfs found.")
    else:
        print("Unable to determine user location.")

if __name__ == "__main__":
    main()
