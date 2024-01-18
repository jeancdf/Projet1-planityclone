package main

import (
	"fmt"
	"net/http"
)

func helloWorldPage(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Hello World")
}

func Coiffeur(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Coiffeur")
}

func Barbier(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Barbier")
}

func Manucure(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Manucure")
}

func main() {
// Imprimez dans la console pour indiquer que le serveur a démarré
fmt.Println("Server is running on :8080")

// Routes
http.HandleFunc("/", helloWorldPage)
http.HandleFunc("/Coiffeur", Coiffeur)
http.HandleFunc("/Barbier", Barbier)
http.HandleFunc("/Manucure", Manucure)
http.HandleFunc("/Institut de beauté", helloWorldPage)

// Démarrer le serveur sur le port 8080
http.ListenAndServe(":8080", nil)
}