Movie Booking Website
Welcome to the Movie Booking Website project, a comprehensive platform designed for cinema theatres in a city. This platform allows users to book movie tickets online through an easy-to-use interface, catering to both administrators and customers.

Features
Movies
Admin Capabilities:

Add, Update, and Delete Movies.
Customer Capabilities:

View Movies.
Movie Details:

Title
Image
Language
Genre
Director
Trailer
Description
Duration
Start Date
End Date
Theatres
Admin Capabilities:

Add, Update, and Delete Theatres.
Customer Capabilities:

View Theatres.
Theatre Details:

Name
City
Ticket Price
Seats
Image
Showtimes
Showtimes
Admin Capabilities:

Add, Update, and Delete Showtimes.
Customer Capabilities:

View Showtimes.
Showtime Details:

Ticket Price
Start Date
End Date
Movie ID
Theatre ID
Reservations
Admin Capabilities:

Add, Update, and Delete Reservations.
Customer Capabilities:

View, Add, and Cancel Reservations (No Editing).
Reservation Details:

Date
Start Time
Seats
Order ID
Ticket Price
Total
Movie ID
Theatre ID
Name
Phone
Users
Admin Capabilities:

Add, Update, and Delete Users.
Customer Capabilities:

Add, Update, and Delete their own User Profile.
User Details:

Name
Email
Password
Role (Admin, Customer, SuperAdmin)
Phone
Order ID
Assumptions
Movies are those released by the Indian Film Industry.
Theatres are physical locations where movies are shown.
Showtimes represent the range of dates during which a movie is available at a particular theatre.
Reservations are bookings made by customers for seats in a theatre.
Each theatre can have a variable number of seats.
Seats are arranged with Rows labeled from A to Z and Columns from 1 to 100.
Seating arrangement can be non-rectangular and vary in number.
Constraints
Maximum Rows: 26
Maximum Columns: 100
Seats per row can vary (e.g., 1st Row: 15 Seats, 2nd Row: 10 Seats, 3rd Row: 5 Seats, etc.).
Additional Features
Support: Option to call and WhatsApp support for customer assistance.
Authentication: Use emails for authentication and sending booked tickets.
Payment Gateway: Utilize a dummy payment gateway for collecting payment details (real payments are not collected).
Installation
To get started with the project:

Clone the repository:

bash
Copy code
git clone https://github.com/VarunKeta/StackHash-Model.git
Install dependencies:

bash
Copy code
cd client
npm install
cd ../server
npm install
Start the application:

bash
Copy code
npm start
Usage
Admin Dashboard: Manage Movies, Theatres, Showtimes, Reservations, and Users.
Customer Interface: Browse Movies and Theatres, view Showtimes, make Reservations, and manage user profiles.
