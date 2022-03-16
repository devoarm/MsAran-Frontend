# สร้าง Docker Images

docker build -t MsAranhos:1.0 .

# รัน Docker Container

docker run -v ${PWD}:/app -v /app/node_modules -p 1112:8080 --rm MsAranhos:1.0
# MsAran-Frontend
