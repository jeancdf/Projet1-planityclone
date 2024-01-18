package main

import (
	"fmt"
	"net/http"
)

//ROUTES
//Home
func Home(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Welcome")
}

//Coiffeur
func Coiffeur(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Coiffeur")
}

//Barbier
func Barbier(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Barbier")
}

//Manucure
func Manucure(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Manucure")
}

//Institut
func Institut(w http.ResponseWriter, r *http.Request){
	fmt.Fprint(w, "Institut de beauté")
}

func main() {
// Imprimez dans la console pour indiquer que le serveur a démarré
fmt.Println("Server is running on :8080")

// Routes
http.HandleFunc("/", Home)
http.HandleFunc("/Coiffeur", Coiffeur)
http.HandleFunc("/Barbier", Barbier)
http.HandleFunc("/Manucure", Manucure)
http.HandleFunc("/Institut", Institut)

// Démarrer le serveur sur le port 8080
http.ListenAndServe(":8080", nil)
}