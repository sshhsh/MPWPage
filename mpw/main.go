package main

import (
	"log"
	"syscall/js"
)

func main() {
	done := make(chan struct{}, 0)
	js.Global().Set("wasmLogin", js.FuncOf(wasmLogin))
	js.Global().Set("wasmIsLogin", js.FuncOf(wasmIsLogin))
	js.Global().Set("wasmGenerate", js.FuncOf(wasmGenerate))
	<-done
}

var mpw MPW

func wasmIsLogin(this js.Value, args []js.Value) interface{} {
	return mpw.key != nil
}

func wasmLogin(this js.Value, args []js.Value) interface{} {
	mpw2, err := login(args[0].String(), args[1].String())
	mpw = mpw2
	if err != nil {
		log.Println(err)
		return "login failed"
	}
	return true
}

func wasmGenerate(this js.Value, args []js.Value) interface{} {
	res, err := mpw.generate(args[0].String(), uint32(args[1].Int()), args[2].String(), args[3].String(), args[4].String())
	if err != nil {
		log.Println(err)
		return "gen failed"
	}
	return res
}
