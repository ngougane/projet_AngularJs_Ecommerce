/* Pour créer une application AngularJS, on doit 1/ créer l'object Javascript représentant l'application grâce à "angular.module" (ci-dessous) 2/ et lier le code html à cet objet grâce à l'attribut ng-app (dans le html link)*/
/* Le premier argument de la fonction "module" permet de donner un nom à notre application. C'est ce nom que nous devrons utiliser pour définir l'attribut "ng-app" dans notre code "html". */
var app = angular.module('appCfg', []);
app.controller('displayContent', function($scope, $http) { /* $scope = contexte (dans le cas où)/ un $scope est organisé sous forme d’une arborescence d’objets // Le "controller" ci-contre se comporte comme une fonction allant simplement initialiser le scope AngularJS sur lequel il est attaché.*/
  $http.get('assets/js/cfg.json').then(function(response) { /* "$http.get" permet de charger (ou d'appeler) un fichier (ici cfg.json) afin d'y ajouter des fonctions */
    $scope.cfg = response.data;
  });
  /* CATÉGORIES DANS LA NAVBAR */
  $scope.changeCategory = function(category) { /*Dans le cas on veut changer de catégorie, on applique la fonction sur la dite catégorie */
    $scope.filterCategory = category;
  };
  /* TRIER PAR */
    $scope.changeOrder = function(order) {
      $scope.orderby = order;
  };
  /* BOUTON "AJOUTER AU PANIER" SUR LA PAGE*/

  $scope.quantityBasket = {}; /* dans le cas où on veut changer la quantité*/
  $scope.addBasket = function(add) { /* quand on ajoute un produit au panier, on exécute la fonction ajouter  */
    var id = add; /* le nombre de "id" (produit) dépend du nombre d'ajouts (add) (click sur le bouton "Ajouter au panier") */
    if(!(id in $scope.quantityBasket)){ /* si on ajoute un premier produit au panier */
      $scope.quantityBasket[id] = 1; /* alors la valeur du panier devient 1 */
    }else{ /* sinon*/
      $scope.quantityBasket[id]++; /* à chaque ajout, on ajoute (on incrémente) la quantité du panier de +1*/
    }
  }

  /* SI NOUS L'AVIONS FAIT EN JQUERY*/

  /*
$('quantityBasket') = {};
$('addBasket') = function(add) {
var id = add;
if(!(id in $('quantityBasket'))){
$('quantityBasket')[id] = 1;
} else {
$('quantityBasket')[id]++;
}
  */


  /* DANS LA FENÊTRE MODAL (PANIER) */

  /* (Sous-total) Prix par ligne de produit (prix affiché en haut à droite du produit) */
  $scope.totalPriceItems = function() { /* On appelle le total du prix de chaque produit */
  var totalPriceItems = 0; /* on part de zero */
  angular.forEach($scope.quantityBasket, function(value, key) { /* pour chaque produit (forEach) on récupère sa quantité (value) et son prix (key) */
    totalPriceItems += $scope.cfg[key].price * value;  /* la sous-total de la ligne de produit = prix du produit multiplié par sa quantité*/
  })
    return totalPriceItems; /* et on affiche le sous-total par ligne de produit */
  }
/* Quantité de produits par ligne de produit (Qté :) */
  $scope.totalQtyKeyBasket = function() { /* pour afficher la quantité du nombre de produits par ligne */
  var totalQtyKeyBasket = 0; /* on part de zero */
  angular.forEach($scope.quantityBasket, function(value, key) { /* pour chaque produit (forEach) on applique la fonction pour récupérer la quantité (avec l'attribut value)  */
    totalQtyKeyBasket += $scope.quantityBasket[key]; /* la quantité définitive du panier = quantité du panier en cours + l'ajout d'un autre produit quand on clique sur + */
  })
    return totalQtyKeyBasket; /* et on affiche le sous-total du nombre de produits par ligne (Qté) */
  }

  $scope.removeItem = function(index) { /* le bouton "supprimer" (removeItem)*/
     	delete $scope.quantityBasket[index]; /* a pour fonction de supprimer la quantité du panier par ligne*/
  }
  $scope.addQty = function(key) { /* si on ajoute un produit (button +) on applique la fonction*/
     $scope.quantityBasket[key]++; /* et on ajoute la quantité (on incrémente) de +1 */
  }
  $scope.lessQty = function(key) { /* si on enlève un produit (button -) on applique la fonction*/
     	$scope.quantityBasket[key]--; /* et on retire la quantité de -1 */
      if($scope.quantityBasket[key] == 0){ /* et si la quantité devient égale à 0*/
        delete $scope.quantityBasket[key]; /*dans ce cas on supprimé la ligne */
      }
  }
  $scope.delBasket = function() { /* dans le cas où il ne nous reste plus qu'un seul produit et qu'on appuie sur "supprimer"*/
        delete $scope.quantityBasket; /* "delBasket" a alors pour fonction de supprimer la quantité totale du panier */
        $scope.quantityBasket = {}; /*  le panier est donc vide */
      }
});
/* JQuery */
$(document).ready(function () { /* on appelle le doc html et on lui applique une fonction */
    $('#changeCategoryList li').click(function() { /* Quand on clique que une catégorie (navbar )*/
        $('.activeCategory').removeClass('activeCategory'); /*On active la catégorie choisie et on masque les autres */
         $(this).addClass('activeCategory');
    });
});

/* Pour vous apporter plus d'informations sur ""$scope", "module" et "controller" je vous ai ajouté les liens ci-dessous*/
/* src $scope : https://openclassrooms.com/fr/courses/2516051-developpez-vos-applications-web-avec-angularjs/2827761-plus-de-details-sur-scope*/
/* src $scope & controller : https://www.geomatys.com/fr/2015/06/16/scopes-et-controllers-angularjs/*/
