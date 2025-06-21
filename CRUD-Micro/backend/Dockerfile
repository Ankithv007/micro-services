# Step 1: Build React/Vite app if dist/ not provided
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Use nginx to serve files
FROM nginx:alpine

# By default, copy from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# OPTIONAL: If you *also* want to support pre-built dist/ at build time, uncomment:
# COPY dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#### backend .env
# #Database credentials (matches init.sql)
# # Database credentials (matches init.sql)
# DB_HOST=db
# DB_USER=nodeuser
# DB_PASSWORD=MySecurePass123!
# DB_NAME=crud
# DB_PORT=3306
# DB_DATE_STRINGS=true

# # App Port
# PORT=5000

# ub

#### front end .env (change all-ways )
# VITE_API_URL=http://65.2.123.19:5000

