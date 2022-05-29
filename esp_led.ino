#include <FirebaseESP8266.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif

#define WIFI_SSID "********"
#define WIFI_PASSWORD "********"

#define LedPin D0
#define FIREBASE_HOST "shake-n-take-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "qmXbtN0EHaMfWL2C4UVpm66wsxjDwiR9lrMLV0w2"

void setup ()
{
  pinMode(LedPin, OUTPUT);
  Serial.begin(115200);
  
  // connect to wifi
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
void loop ()
{
  if (Firebase.getString(firebaseData, "/Led1Status"))
  {
    String ledstatus = firebaseData.stringData();
    if (ledstatus.toInt() == 1) {
      digitalWrite(LedPin, LOW);
      Serial.println("on");
    }
    else {
      digitalWrite(LedPin, HIGH);
      Serial.println("off");
    }
  } else {
    Serial.print("Error in getInt, ");
    Serial.println(firebaseData.errorReason());
  }
}
