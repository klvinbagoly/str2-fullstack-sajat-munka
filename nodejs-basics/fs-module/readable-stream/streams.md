Stream
Adatok sorozata, adatfolyam
Nagy mennyiségű adatok kezelésénél hasznos
Nem kell a teljes tartalmat a memóriában tartani
Buffer-eket, fix méretű tárolókat használ
Típusai
Readable - adatok kiolvasása
Writable - adatok írása
Duplex - adatok írása és olvasása
Transform - adatok módosítása írás/olvasás közben
Módok
Standard
Alapértelmezett mód
String, Buffer vagy UInt8Array típussal dolgozik
A belső folyamatoknál csak ezt használja a NodeJS
Object
Az objektumokat és nem a bájtokat számolja
