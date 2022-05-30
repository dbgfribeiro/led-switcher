#include <FirebaseESP8266.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif

#define WIFI_SSID "***-****-****" // your wifi SSID
#define WIFI_PASSWORD "*************" //your wifi PASSWORD

#define TiltPin D0
float shakes = 0;

#define FIREBASE_HOST "shake-n-take-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "qmXbtN0EHaMfWL2C4UVpm66wsxjDwiR9lrMLV0w2"
FirebaseData firebaseData;

void setup () {
  pinMode(TiltPin, OUTPUT);
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
  
  // If the sensor is stable, 'shakes remains == 0
  if (digitalRead(TiltPin) == 1) {
    shakes = 0;
  }
  // If the box is shaked 'shakes' is incremented
  else {
    shakes += 0.5;
  }
  Firebase.setFloat(firebaseData, "/Led1Status", shakes);
  //Serial.println(Firebase.getString(firebaseData, "/Led1Status"));
  delay(100);
}