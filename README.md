# AgroVision
![image](https://github.com/user-attachments/assets/4cfa289b-ec66-491c-b2f1-f7d8bc60e22f)


For the Machine Learning / AI part refer this : https://github.com/Joywin2412/Flask-Chat-Bot-and-Crop-Prediction-


# GFG-Hackathon
Technologies used :  MongoDB , Node.js , Express.js
, React.js , React-router-dom , JWT , Bcrypt , React-Leaflet


# Signup 
Made a user schema for this. Made extra restriction on the basis of 
1) If name ,email , password or phone is missing
2) If password is not the same as confirm Password field
<img width="552" alt="Screenshot 2023-04-26 162107" src="https://user-images.githubusercontent.com/78720314/234554088-2d195ebc-0244-4f92-b0d9-c0110ae42256.png">

Data is stored in the user schema. Address is taken from the user to provide the latitude and 
longitude for our further api calls. The more accurate the address is the more accurate the location is.

# Login 
Check the password with respect to the email provided.
Made extra restriction on the basis of 
1) If name ,email is missing

<img width="559" alt="image" src="https://user-images.githubusercontent.com/78720314/234553860-c6ee08c0-24bc-4231-880f-aeef6bbb3e6c.png">


In both signup and login , useNavigate() from react-router-dom is taken

# Home 

<img width="905" alt="Screenshot 2023-04-25 190820" src="https://user-images.githubusercontent.com/78720314/234295051-58adcf7c-42cb-45fa-8d71-17381bfb4a63.png">

Guest Login : If the user is not signed in the profile feature would not be available to him.
Also if you are guest it will show signup to access when you access resource in home. You can check the
optimal crops in your region. 

As a logged in user you can check the optimal crops and also assess which crops should you grow and the
methods for it.
When a user registers for the first time , the polygon boundary is set in the polygon model.

If a user is first in that polygon boundary the user becomes the parent user with the polygon boundaries
and the polygon is uniquely identified with the help of an id which is implemented with email and useId 
hook in react.
However if a user is present inside a polygon already created he gets assigned that same id which groups
the farmers under one polygon.
The key idea is the soil temperature is almost constant across a small polygon which will make our data
more reliable and foster relevant advices through the medium of farmers phone.


<img width="882" alt="Screenshot 2023-04-25 190851" src="https://user-images.githubusercontent.com/78720314/234297088-09b777ad-b5b6-42d6-892d-32b81ce0f6d5.png">


## Navbar 
A person will be able to navigate to different pages using react-router-dom. A person will
be able to navigate to his own profile using this. Logout , login feature implemented. Local storage 
added so as to store the data when a user reloads.


# Weather forecast 
<img width="862" alt="Screenshot 2023-04-25 191415" src="https://user-images.githubusercontent.com/78720314/234297979-ce144a2f-e0bc-4dee-a173-8aec0bdbd5bd.png">

The weather data will be available to both guests and the logged in users.

# Local crops
The farmer will be able to see all the farmers in the polygon. And on the popup of the
map the person navigates to the profile. This is implemented with the help of react-leaflet and also
using useNavigate from react-router-dom.
<img width="920" alt="Screenshot 2023-04-25 191300" src="https://user-images.githubusercontent.com/78720314/234297589-694d303d-2eca-4c94-9bfc-75da59ec12a1.png">


In order to incentivize the farmers to input what crops they are growing , the crop button are only 
visible after filling the form in the profile. After filling the form in the profile the user will
be able to see what crops the farmers in their polygon are growing and suitably grow their crops and 
assess market needs.


This is implemented using the cropsSchema in order to obtain the form data. 
In the profile , friends feature is implemented which will be explained in the profile paragraph. If
a user is friend then they will be able to see their phone number. In order to reduce the loading
time , hashing is done using the email key as it is unique.

# Stores 

<img width="887" alt="Screenshot 2023-04-25 191342" src="https://user-images.githubusercontent.com/78720314/234297876-88954081-ae79-4998-bc3f-880f1a027d92.png">

The farmer will be able to see the stores nearby which is done using an api call. The parameters
which were used in the api call is latitude and longitude. The map is shown using react-leaflet and
openStreet Map. This will help the farmers to assess how far the stores are. Also the farmers will
be able to see which agricultural supplies to buy from.

# Profile 
Name , email ,phone of the current user is visible. If a user is friend then the user will
be able to see their phone number. The friends feature is implemented using the friendsSchema in 
mongoDB. A form is done to incentivize the farmers as mentioned above. The friends feature include:

<img width="852" alt="Screenshot 2023-04-25 191228" src="https://user-images.githubusercontent.com/78720314/234297396-ba2ad501-a07e-4fb0-a1ce-b532e420ddd6.png">

1) People around you (Querying the database to find the users on basis of polygon id)
2) Notifications (If a person sends you a friend request)
3) Friends (This includes the friends made)
The basic feature of implementing friends is to secure the farmers data and to show phone number of 
each other if they are friend.

# Other Profile 

<img width="887" alt="Screenshot 2023-04-25 191325" src="https://user-images.githubusercontent.com/78720314/234297770-7e4ede0e-59dc-49c0-8ca3-722df3f56f27.png">

If a user navigates to other profile either from friends or from map in local crops. 
A user will be able to see the phone only if the user is a friend. To speed up we have used hashing 
of the friends email. 
