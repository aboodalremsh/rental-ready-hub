# RentEase Node.js Backend

This is the Node.js Express backend for RentEase, connecting to your local MySQL database.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy the example environment file and update with your MySQL credentials:

```bash
cp .env.example .env
```

Edit `.env` with your settings:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=rentease
DB_PORT=3306
JWT_SECRET=your-super-secret-jwt-key
PORT=3001
```

### 3. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The API will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Login
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/signout` - Logout

### Properties
- `GET /api/properties` - Get all available properties
- `GET /api/properties/featured` - Get featured properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (requires auth)

### Rentals
- `GET /api/rentals` - Get user's rentals (requires auth)
- `POST /api/rentals` - Create rental application (requires auth)
- `PATCH /api/rentals/:id` - Update rental (requires auth)

### Saved Properties
- `GET /api/saved` - Get saved properties (requires auth)
- `GET /api/saved/check/:propertyId` - Check if property is saved
- `POST /api/saved` - Save a property (requires auth)
- `DELETE /api/saved/:propertyId` - Unsave a property (requires auth)

### Contact
- `POST /api/contact` - Submit contact message

## Authentication

Use Bearer token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```
