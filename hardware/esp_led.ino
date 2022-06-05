#include <FirebaseESP8266.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif

#define WIFI_SSID "***-****-****"
#define WIFI_PASSWORD "*************"

#define TiltPin D0
#define LED D4
float shakes = 0;

#define FIREBASE_HOST "shake-n-take-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "qmXbtN0EHaMfWL2C4UVpm66wsxjDwiR9lrMLV0w2"
FirebaseData firebaseData;

void setup () {
  pinMode(TiltPin, OUTPUT);
  pinMode(LED, OUTPUT);
  Serial.begin(9600);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println();
  Serial.print("connected: ") ;
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
}

void loop () {
  digitalWrite(LED, HIGH);
  // If the sensor is stable, 'shakes remains == 0
  if (digitalRead(TiltPin) == 1) {
    shakes = 0;
  }
  // If the box is shaked 'shakes' is incremented
  else if (shakes < 10){
    shakes += 0.5;
  }
  Firebase.setFloat(firebaseData, "/TiltStatus", shakes);
  //Serial.println(Firebase.getString(firebaseData, "/TiltStatus"));
  Serial.println(shakes);
  delay(100);
}