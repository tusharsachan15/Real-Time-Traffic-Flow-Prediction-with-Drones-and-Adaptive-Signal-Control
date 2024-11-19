# Real-Time Traffic Flow Prediction with Drones and Adaptive Signal Control

This project utilizes drone technology, YOLOv8 object detection, and machine learning to predict traffic flow and manage traffic signals dynamically. By integrating aerial surveillance, ground-level data, and regression models, it offers a scalable solution for urban traffic management.

---

## Overview

Urban areas face increasing challenges with traffic congestion. This project addresses these issues through:

- **Drone Technology**: High-resolution aerial footage for extensive traffic monitoring.
- **YOLOv8**: Cutting-edge object detection for real-time vehicle tracking.
- **Regression Models**: Optimized traffic signal timings based on real-time data.
- **Raspberry Pi**: Edge computing for adaptive traffic control.

---

## Features

- **Real-Time Traffic Monitoring**: High-speed vehicle detection using YOLOv8.
- **Dynamic Signal Control**: Adapts signal intervals based on traffic density.
- **Scalable Design**: Supports multi-intersection deployment.
- **Cost-Efficient Hardware**: Operates on resource-constrained devices like Raspberry Pi.

---

## System Architecture

![System Architecture](https://github.com/tusharsachan15/Real-Time-Traffic-Flow-Prediction-with-Drones-and-Adaptive-Signal-Control/blob/main/Frontend/Figures/Architecture%20Diagram.png)

---

## Hardware Setup

- **Drone**: High-resolution camera and GPS module.
- **Raspberry Pi 5**: Central processing unit for real-time analysis.
- **Pixhawk Flight Controller**: Ensures smooth drone operation.
- **Wireless Communication Modules**: For seamless connectivity.

![Hardware Components](https://github.com/tusharsachan15/Real-Time-Traffic-Flow-Prediction-with-Drones-and-Adaptive-Signal-Control/blob/main/Frontend/Figures/Hardware.png)

---

## Output Example

### Web Application
![Web Application](https://github.com/tusharsachan15/Real-Time-Traffic-Flow-Prediction-with-Drones-and-Adaptive-Signal-Control/blob/main/Frontend/Figures/Webapp.png)
*Preview*: Displays the web application interface used for monitoring and control.

### Red Light
![Red Light](https://github.com/tusharsachan15/Real-Time-Traffic-Flow-Prediction-with-Drones-and-Adaptive-Signal-Control/blob/main/Frontend/Figures/Red%20light.png)
*Preview*: Example of a red light scenario captured by the system.

### Less Traffic
![Less Traffic](https://github.com/tusharsachan15/Real-Time-Traffic-Flow-Prediction-with-Drones-and-Adaptive-Signal-Control/blob/main/Frontend/Figures/Less%20traffic.png)
*Preview*: Demonstrates the system’s response during low traffic conditions.

### Heavy Traffic
![Heavy Traffic](https://github.com/tusharsachan15/Real-Time-Traffic-Flow-Prediction-with-Drones-and-Adaptive-Signal-Control/blob/main/Frontend/Figures/Heavy%20traffic.png)
*Preview*: Highlights the system’s action during high traffic scenarios.


---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Real-Time-Traffic-Flow-Prediction.git

2. Install the required Python packages:

## Usage

### Training the YOLOv8 Model

1. **Dataset Preparation**:
   - Organize the dataset in YOLOv8 format (images and corresponding label files).
   - Use pre-existing datasets like COCO or create a custom labeled dataset tailored for traffic.

2. **Train the Model**:
   Use the following command to fine-tune YOLOv8:

   ```bash
   python train.py --data path/to/dataset.yaml --weights yolov8.pt
   
3. **Evaluate the Model**:
   After training, evaluate the model performance on the test set:

   ```bash
   python val.py --data path/to/dataset.yaml --weights best.pt

### Deploying the System

1. **Vehicle Detection**: 
   Start the YOLOv8 model to process drone footage in real-time:

   ```bash
   python detect.py --source path/to/video.mp4 --weights best.pt

2. **Dynamic Signal Control**:
   Run the regression model to predict optimal signal durations and control traffic signals dynamically:

   ```bash
   python signal_control.py

3. **Deploy on Edge Device**:
   Set up the Raspberry Pi to process traffic data locally and control signals.


## Contribution Guidelines

Contributions to the project are encouraged! Whether you're interested in adding new features, fixing bugs, or improving documentation, please submit pull requests. Follow the contribution guidelines outlined in `CONTRIBUTING.md`.

## Contact

For any questions, suggestions, or further assistance, feel free to reach out:

- **Email**: [tusharsachan2002@gmail.com](mailto:tusharsachan2002@gmail.com) [canankushdoit@gmail.com](mailto:canankushdoit@gmail.com)
