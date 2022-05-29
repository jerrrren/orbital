package server

import (
	"encoding/json"
	"errors"
	"fmt"
	"go-todo-list/internal/config"
	"go-todo-list/internal/database"
	"net/http"
	"strconv"
	"time"

	"github.com/cristalhq/jwt/v4"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

var (
	//jwt signer and jwt verifier
	jwtSigner   jwt.Signer
	jwtVerifier jwt.Verifier
)

//setting up the jwt signer and jwt verifier
func jwtSetup(conf config.Config) {
	var err error
	key := []byte(conf.JwtSecret)

	jwtSigner, err = jwt.NewSignerHS(jwt.HS256, key)
	if err != nil {
		log.Panic().Err(err).Msg("Error creating JWT signer")
	}

	jwtVerifier, err = jwt.NewVerifierHS(jwt.HS256, key)
	if err != nil {
		log.Panic().Err(err).Msg("Error creating JWT verifier")
	}
}

//generate jwt tokens
func generateJWT(user *database.User) string {
	//create claims
	claims := &jwt.RegisteredClaims{
		ID:        fmt.Sprint(user.ID),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 7)),
	}

	//creating a builder
	builder := jwt.NewBuilder(jwtSigner)

	//generating token using the builder and claim
	token, err := builder.Build(claims)
	if err != nil {
		log.Panic().Err(err).Msg("Error building JWT token")
	}

	//convert the token to the string form and return it
	return token.String()
}

//verify jwt tokens
func verifyJwt(tokenStr string) (int, error) {
	//check if can successfully parse tokenStr and get token
	token, err := jwt.Parse([]byte(tokenStr), jwtVerifier)
	if err != nil {
		log.Panic().Err(err).Msg("Error in parsing JWT")
		return 0, err
	}

	//verifies token
	if err := jwtVerifier.Verify(token); err != nil {
		log.Panic().Err(err).Msg("Error in verifying token")
		return 0, err
	}

	//gets claim from token
	var claims jwt.RegisteredClaims
	if err := json.Unmarshal(token.Claims(), &claims); err != nil {
		log.Panic().Err(err).Msg("Error in unmarshalling JWT claims")
		return 0, err
	}

	//verify is the token have expried from the claims
	if notExpired := claims.IsValidAt(time.Now()); !notExpired {
		log.Panic().Err(err).Msg("tokens have expired")
		return 0, errors.New("Tokens have expired")
	}

	//tries to convert ID to int
	id, err := strconv.Atoi(claims.ID)
	if err != nil {
		log.Panic().Err(err).Str("claims.ID", claims.ID).Msg("Error converting claims ID to number")
		return 0, errors.New("ID in token is not valid")
	}
	return id, err
}

//authenticate user and return user in a context
func getUser(c *gin.Context) {
	cookie, err := c.Request.Cookie("auth_cookie")

	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "error in authentication"})
	}

	val := cookie.Value

	if val == "" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized operation"})
	}

	id, err := verifyJwt(val)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "error in authentication"})
	}

	user, err := database.FetchUser(id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "error in retrieving user from database"})
	}

	user.Password = ""

	c.JSON(http.StatusOK, user)
}

func logOut(c *gin.Context) {
	c.SetCookie("auth_cookie", "", 0, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{"message": "successfully logged out"})
}
