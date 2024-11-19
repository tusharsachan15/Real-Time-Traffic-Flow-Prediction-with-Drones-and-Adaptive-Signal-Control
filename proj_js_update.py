# import cv2
# from ultralytics import YOLO
# import requests

# URL = 'https://traffic-signal-server.onrender.com/data'


# # Function to calculate signal time based on detected cars and trucks
# def calculate_signal_time(cars_total, trucks_total):
#     # Constants from the regression model
#     beta_0 = 9.875
#     beta_1 = 0.775
#     beta_2 = 2.875
    
#     # Calculate the green signal time
#     signal_time = beta_0 + (beta_1 * cars_total) + (beta_2 * trucks_total)
#     try:
#         response = requests.post(URL, json={"green_time": signal_time})
#     except Exception as e:
#         print(e)
#     return signal_time

# def main():
#     # Load the YOLOv8 model (pre-trained on COCO dataset)
#     model = YOLO('yolov8n.pt')
    
#     # Specify video source, can be a video file or webcam (for live detection)
#     video_source = '/Users/tushar/Desktop/Drones/trafic1.mp4'  # Change to 0 for live webcam detection
#     cap = cv2.VideoCapture(video_source)

#     if not cap.isOpened():
#         print("Error: Unable to open video source.")
#         return
    
#     # COCO dataset class IDs for vehicles: {2: 'car', 3: 'motorcycle', 5: 'bus', 7: 'truck'}
#     vehicle_classes = [2, 3, 5, 7]  # We'll focus on cars and trucks (and possibly buses)

#     # Define the x-coordinate for the imaginary vertical line to separate lanes
#     line_x = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) * 0.23)  # Adjust based on video resolution

#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             print("Error: Unable to fetch frame.")
#             break

#         # Draw the imaginary vertical line
#         cv2.line(frame, (line_x, 0), (line_x, frame.shape[0]), (255, 0, 0), 2)

#         # YOLOv8 inference, only detect vehicles specified by class IDs
#         results = model.predict(frame, classes=vehicle_classes)  # Only detect cars, trucks, buses, motorcycles

#         car_count = 0
#         truck_count = 0

#         # Loop through the results and count vehicles on the incoming lane
#         for result in results:
#             for box in result.boxes:
#                 cls = int(box.cls[0])  # Get the class ID
#                 x1, y1, x2, y2 = map(int, box.xyxy[0])

#                 # Only consider vehicles to the right of the vertical line (incoming lane)
#                 if x2 > line_x:
#                     if cls == 2:  # Car
#                         car_count += 1
#                     elif cls == 5 or cls == 7:  # Truck and bus
#                         truck_count += 1

#                     # Draw bounding box for the detected vehicle
#                     label = 'car' if cls == 2 else 'truck' if cls == 7 else 'bus'
#                     cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
#                     cv2.putText(frame, f'{label}', (x1, y1 - 10), 
#                                 cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

#         # Calculate the green signal time based on the counts of cars and trucks
#         signal_time = calculate_signal_time(car_count, truck_count)

#         # Display green signal time on the frame
#         cv2.putText(frame, f'Green Signal Time: {signal_time:.2f}s', (10, 60), 
#                     cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
        
#         # Show the frame with detections and signal time
#         cv2.imshow("Vehicle Detection and Signal Time", frame)

#         # Exit on 'q' key press
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()

# if __name__ == '__main__':
#     main()



import cv2
from ultralytics import YOLO
import requests

URL = 'https://traffic-signal-server.onrender.com/data'


# Function to calculate signal time based on detected cars and trucks
def calculate_signal_time(cars_total, trucks_total):
    # Constants from the regression model
    beta_0 = 9.875
    beta_1 = 0.775
    beta_2 = 2.875
    
    # Calculate the green signal time
    signal_time = beta_0 + (beta_1 * cars_total) + (beta_2 * trucks_total)
    try:
        response = requests.post(URL, json={"green_time": signal_time})
    except Exception as e:
        print(e)
    return signal_time

def main():
    # Load the YOLOv8 model (pre-trained on COCO dataset)
    model = YOLO('yolov8n.pt')
    
    # Specify video source, can be a video file or webcam (for live detection)
    video_source = '/Users/tushar/Desktop/Drones/trafic2.mp4'  # Change to 0 for live webcam detection
    cap = cv2.VideoCapture(video_source)

    if not cap.isOpened():
        print("Error: Unable to open video source.")
        return
    
    # COCO dataset class IDs for vehicles: {2: 'car', 3: 'motorcycle', 5: 'bus', 7: 'truck'}
    vehicle_classes = [2, 3, 5, 7]  # We'll focus on cars and trucks (and possibly buses)

    # Define the x-coordinate for the imaginary vertical line to separate lanes
    line_x = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) * 0.70)  # Adjust based on video resolution

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("Error: Unable to fetch frame.")
            break

        # Draw the imaginary vertical line
        cv2.line(frame, (line_x, 0), (line_x, frame.shape[0]), (255, 0, 0), 2)

        # YOLOv8 inference, only detect vehicles specified by class IDs
        results = model.predict(frame, classes=vehicle_classes)  # Only detect cars, trucks, buses, motorcycles

        car_count = 0
        truck_count = 0

        # Loop through the results and count vehicles on the incoming lane
        for result in results:
            for box in result.boxes:
                cls = int(box.cls[0])  # Get the class ID
                x1, y1, x2, y2 = map(int, box.xyxy[0])

                # Only consider vehicles to the left of the vertical line (incoming lane)
                if x1 < line_x:
                    if cls == 2:  # Car
                        car_count += 1
                    elif cls == 5 or cls == 7:  # Truck and bus
                        truck_count += 1

                    # Draw bounding box for the detected vehicle
                    label = 'car' if cls == 2 else 'truck' if cls == 7 else 'bus'
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.putText(frame, f'{label}', (x1, y1 - 10), 
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        # Calculate the green signal time based on the counts of cars and trucks
        signal_time = calculate_signal_time(car_count, truck_count)

        # Display green signal time on the frame
        cv2.putText(frame, f'Green Signal Time: {signal_time:.2f}s', (10, 60), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
        
        # Show the frame with detections and signal time
        cv2.imshow("Vehicle Detection and Signal Time", frame)

        # Exit on 'q' key press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
