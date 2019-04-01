FROM python:3

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000
