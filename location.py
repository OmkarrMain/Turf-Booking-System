import folium
import googlemaps
import webbrowser
import os

gmaps = googlemaps.Client(key='AIzaSyCYcHknfiD3Mj7qm5bKSkxuKFWoUtR71Go')

# Geolocation API to get user's current location
def get_user_location():
    try:
        result = gmaps.geolocate()
        user_location = (result['location']['lat'], result['location']['lng'])
        return user_location
    except Exception as e:
        print("Error getting user location:", e)
        return None
    
# Places API to search for nearby turfs
def search_nearby_turfs(user_location):
    try:
        places_result = gmaps.places_nearby(location=user_location, radius=2500, keyword='turf')
        turfs = places_result['results']
        return turfs
    except Exception as e:
        print("Error searching for nearby turfs:", e)
        return None

# Get user's location
def main():
    user_location = get_user_location()
    if user_location:
        print("User location:", user_location)

        # Search for nearby turfs
        turfs = search_nearby_turfs(user_location)
        if turfs:
            print("Nearby turfs:")
            # Create a map centered at the user's location
            turf_map = folium.Map(location=user_location, zoom_start=15)
            
            # Add markers for each nearby turf
            for turf in turfs:
                turf_location = (turf['geometry']['location']['lat'], turf['geometry']['location']['lng'])
                folium.Marker(location=turf_location, popup=turf['name']).add_to(turf_map)

            file_path = os.path.join('templates', 'location.html')
            turf_map.save(file_path)
            print("location.html")

        else:
            print("No nearby turfs found.")
    else:
        print("Unable to determine user location.")

if __name__ == "__main__":
    main()
