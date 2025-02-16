# LSCS Links Web

LSCS Links Web is the frontend of the LSCS Link Shortener, a project developed by the La Salle Computer Society (LSCS) at De La Salle University. This web application provides a user-friendly interface for generating and managing shortened URLs.

## Features
- Shorten long URLs into compact, shareable links
- Manage and track shortened links
- Customizable link aliases
- Responsive and modern UI

## Technologies Used
- React.js (Frontend Framework)
- Tailwind CSS (Styling)
- TypeScript (Static Typing)
- Axios (API Requests)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- npm or yarn (Package manager)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/dlsu-lscs/lscs-links-web.git
   cd lscs-links-web
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Application
To start the development server, run:
```sh
npm run dev
# or
yarn dev
```

The app will be accessible at `http://localhost:3000/`.

## Configuration
Create a `.env` file in the root directory and add necessary environment variables:
```
VITE_API_BASE_URL=<backend_api_url>
```


