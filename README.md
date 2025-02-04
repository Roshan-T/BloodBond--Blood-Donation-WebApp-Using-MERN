# 🩸 BloodBond: Blood Donation Web App

## 📌 Project Overview

BloodBond is a web application designed to connect blood donors with recipients in need. The platform facilitates blood donation requests, donor registrations, and efficient search for blood availability.

## ✨ Features
* User registration and authentication
* Donor profile management
* Blood donation requests
* Search for available blood donors
* Location-based donor matching
* Notification system for urgent requests
* Reward system for donors

## 🛠 Tech Stack
* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Hosting:** Render (for deployment)

## 🚀 Installation

### Prerequisites
* Node.js (>= 14.x)
* MongoDB (local or cloud instance)
* Git

### Clone the Repository

```sh
git clone https://github.com/your-username/bloodbond.git
cd bloodbond
```

### Backend Setup

```sh
cd backend
npm install
npm start
```

### Frontend Setup

```sh
cd frontend
npm install
npm start
```

The application should now be running at `http://localhost:3000/`.

## 🌐 Deployment
The application is deployed on Render: BloodBond Web App.

## 📸 Screenshots
-Landing Page
<img width="1246" alt="image" src="https://github.com/user-attachments/assets/ee93cf72-e4bc-47fa-b012-27ce97b440cb" />

<img width="1243" alt="image" src="https://github.com/user-attachments/assets/1d2f1e74-8e43-4440-b15f-d8823ec607e8" />

- Homepage
- Hospital Side
  <img width="1247" alt="image" src="https://github.com/user-attachments/assets/6ae20383-e433-4b44-928b-3d115e10cc50" />

- Donor Side
<img width="1238" alt="image" src="https://github.com/user-attachments/assets/02d7ed60-e135-47a5-9a78-c1088e3e31ba" />

- Login

- 
  <img width="308" alt="image" src="https://github.com/user-attachments/assets/aa8384c7-9a74-4565-bead-d304efb26524" />

- Donor Registration
- 
  <img width="616" alt="image" src="https://github.com/user-attachments/assets/862d9ba6-258c-455d-ab82-6988fa89d279" />

- Hospital Registration
- 
  <img width="604" alt="image" src="https://github.com/user-attachments/assets/98038531-a0e7-4227-ab84-9cd829cb8a5a" />
  
  
- Search Donors
  <img width="1255" alt="image" src="https://github.com/user-attachments/assets/7b30c451-2afa-4b31-88cc-a1c4f3c0c517" />

- Campaigns
  <img width="1256" alt="image" src="https://github.com/user-attachments/assets/05e669eb-1d44-4862-8443-3ba5107a844d" />

  <img width="882" alt="image" src="https://github.com/user-attachments/assets/c8030ef1-3dcb-4051-bdd8-31f3d3aa956a" />


- Emergency Requests
  <img width="1272" alt="image" src="https://github.com/user-attachments/assets/903d9b79-edfc-4a42-9c7f-a78bf6869c5c" />

- Rewards
  <img width="1256" alt="image" src="https://github.com/user-attachments/assets/6d86e45a-2fc2-4643-8b1c-2610af084439" />
  <img width="1241" alt="image" src="https://github.com/user-attachments/assets/4e536b5f-76e3-48dd-bffa-1c3a5d2bdc83" />
  <img width="983" alt="image" src="https://github.com/user-attachments/assets/30a2a479-cc9a-4ea2-ae41-493556dc2019" />


- History
  <img width="1255" alt="image" src="https://github.com/user-attachments/assets/67d0aaa2-49c1-4922-9ef0-ff4b45b41f2f" />
- Profile
  <img width="1253" alt="image" src="https://github.com/user-attachments/assets/abd3b400-207e-4822-aa24-2039c8743347" />


## 📡 API Endpoints

### Campaigns
* `POST /campaigns` - Create a new campaign
* `DEL /campaigns/:id` - Delete a campaign
* `PUT /campaigns/interested` - Mark interest in a campaign
* `PUT /campaigns/donated` - Mark donation completed
* `GET /campaigns/active` - Get all active campaigns
* `GET /campaigns/:id` - Get single campaign details

### Donors
* `GET /donors` - Get all registered donors

### Emergency Requests
* `POST /requests` - Create an emergency request
* `DEL /requests/:id` - Delete a request
* `GET /requests/active` - Get all active emergency requests
* `PUT /requests/accepted` - Mark donor as accepted
* `PUT /requests/donated` - Mark donor as donated

### Rewards
* `POST /rewards` - Create a reward
* `PUT /rewards/redeem` - Redeem a reward
* `PUT /rewards/used` - Mark a reward as used
* `GET /rewards/active` - Get all active rewards
* `GET /rewards/:id` - Get a single reward

### Users
* `POST /users/signup` - Register a new user
* `POST /users/login` - Log in user
* `GET /users/logout` - Log out user
* `GET /users/validate` - Validate user
* `GET /users/:id` - Get user details
* `GET /users/rewards` - Get user rewards

## 🤝 Contributing
We welcome contributions! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Feature description"`).
4. Push to your fork (`git push origin feature-branch`).
5. Open a pull request.


## 📞 Contact
For queries or suggestions, reach out to us at roshantiwari9827@gmail.com
