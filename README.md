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

![System Architecture](path/to/architecture-image.png)

---

## Hardware Setup

- **Drone**: High-resolution camera and GPS module.
- **Raspberry Pi 5**: Central processing unit for real-time analysis.
- **Pixhawk Flight Controller**: Ensures smooth drone operation.
- **Wireless Communication Modules**: For seamless connectivity.

![Hardware Components](path/to/hardware-image.png)

---

## Output Example

![Output Example](path/to/output-image.png)

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


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.
We welcome contributions from developers and researchers interested in enhancing this project. To contribute, follow these steps:

### Fork the Repository

1. Click the **"Fork"** button at the top of this repository.
2. Clone the forked repository to your local machine:

   ```bash
   git clone https://github.com/your-username/Real-Time-Traffic-Flow-Prediction.git

### Create a New Branch

1. Create a new branch for your feature or fix:
   
   ```bash
   git checkout -b feature-name
   
#### Commit Your Changes

1. Make your changes to the codebase.
2. Ensure your code is well-documented and adheres to the project guidelines.
3. Commit your changes with a descriptive commit message:
   
   ```bash
   git commit -m "Add feature description"
   
### Push to Your Fork
1. Push the changes to your forked repository:
   
   ```bash
   git push origin feature-name
   
### Submit a Pull Request
