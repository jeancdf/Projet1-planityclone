package main

import (
	"fmt"
	"net/http"
)

func helloWorldPage(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Hello World")
	switch r.URL.Path{
	case "/":
		fmt.Fprint(w, "Hello World")
	case "/ninja": 
		fmt.F
	}
}

func main() {
// Imprimez dans la console pour indiquer que le serveur a démarré
fmt.Println("Server is running on :8080")

// Routes
http.HandleFunc("/", helloWorldPage)
http.HandleFunc("/Coiffeur", helloWorldPage)
http.HandleFunc("/Barbier", helloWorldPage)
http.HandleFunc("/Manucure", helloWorldPage)
http.HandleFunc("/Institut de beauté", helloWorldPage)

// Démarrer le serveur sur le port 8080
http.ListenAndServe(":8080", nil)
}