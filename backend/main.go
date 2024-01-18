package main

import (
	"fmt"
	"net/http"
)

func helloWorldPage(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Hello World")
}

func main() {
// Imprimez dans la console pour indiquer que le serveur a démarré
fmt.Println("Server is running on :8080")

// Définissez la route "/" pour qu'elle utilise la fonction helloWorldPage
http.HandleFunc("/", helloWorldPage)

// Démarrer le serveur sur le port 8080
http.ListenAndServe(":8080", nil)
}