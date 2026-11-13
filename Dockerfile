FROM python:3.12-slim

# ffmpeg — ovoz fayllarini aylantirish uchun kerak
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY server ./server
COPY miniapp ./miniapp

# Ma'lumotlar (kitoblar, Premium, limitlar) shu papkada. Hostingda unga doimiy disk (volume) ulang.
ENV DATA_DIR=/data PORT=8080
EXPOSE 8080
CMD ["python", "-m", "server.main"]
