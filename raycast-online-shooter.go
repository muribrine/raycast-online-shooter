package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {

	const addr string = ":8080"

	g := gin.Default()

	g.LoadHTMLFiles("./public/index.html")

	g.GET("/", func(ctx *gin.Context) { ctx.HTML(http.StatusOK, "index.html", gin.H{}) })
	g.GET("/style.css", func(ctx *gin.Context) { ctx.File("./public/style.css") })

	g.GET("/core.js", func(ctx *gin.Context) { ctx.File("./public/core.js") })
	g.GET("/ui.js", func(ctx *gin.Context) { ctx.File("./public/ui.js") })
	g.GET("/gpu.js", func(ctx *gin.Context) { ctx.File("./public/gpu.js") })
	g.GET("/gl-matrix.js", func(ctx *gin.Context) { ctx.File("./public/gl-matrix.js") })

	fmt.Println("Listening on localhost" + addr)
	g.Run(addr)

}
