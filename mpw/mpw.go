package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/binary"
	"errors"

	"golang.org/x/crypto/scrypt"
)

type MPW struct {
	key []uint8
}

func getUint8Slice(n uint32) []uint8 {
	res := make([]uint8, 4)
	binary.BigEndian.PutUint32(res, n)
	return res
}

func appendString(data []uint8, s string) []uint8 {
	return append(data, []uint8(s)...)
}

func appendLen(data []uint8, s string) []uint8 {
	return append(data, getUint8Slice(uint32(len([]uint8(s))))...)
}

func login(name string, password string) (res MPW, err error) {
	var salt []uint8
	salt = appendString(salt, MPW_NS)
	salt = appendLen(salt, name)
	salt = appendString(salt, name)
	key, err := scrypt.Key([]uint8(password), salt, 32768, 8, 2, 64)
	if err != nil {
		return
	}

	res = MPW{
		key: key,
	}
	return
}

func (mpw *MPW) calculateSeed(site string, counter uint32, context string, NS string) (seed []uint8, err error) {
	if mpw.key == nil {
		err = errors.New("not login")
		return
	}
	if counter == 0 {
		counter = 1
	}
	if NS == "" {
		NS = MPW_NS
	}

	var data []uint8
	data = appendString(data, NS)
	data = appendLen(data, site)
	data = appendString(data, site)
	data = append(data, getUint8Slice(uint32(counter))...)
	if context != "" {
		data = appendLen(data, context)
		data = appendString(data, context)
	}
	h := hmac.New(sha256.New, mpw.key)
	h.Write(data)
	seed = h.Sum(nil)
	return
}

func (mpw *MPW) generate(site string, counter uint32, context string, template string, NS string) (res string, err error) {
	if counter == 0 {
		counter = 1
	}
	if NS == "" {
		NS = MPW_NS
	}
	if template == "" {
		template = "long"
	}

	t, ok := MPW_TEMPLATES[template]
	if !ok {
		err = errors.New("no such template" + template)
		return
	}
	seed, err := mpw.calculateSeed(site, counter, context, NS)
	if err != nil {
		return
	}
	templateStr := t[int(seed[0])%len(t)]
	var passArray []byte
	for i := 0; i < len(templateStr); i++ {
		c := templateStr[i]
		chars := MPW_PASSCHARS[c]
		index := int(seed[i+1]) % len(chars)
		passArray = append(passArray, chars[index])
	}
	res = string(passArray)
	return
}

const MPW_NS string = "com.lyndir.masterpassword"

var MPW_TEMPLATES = map[string][]string{
	"maximum": {
		"anoxxxxxxxxxxxxxxxxx",
		"axxxxxxxxxxxxxxxxxno",
	},
	"long": {
		"CvcvnoCvcvCvcv",
		"CvcvCvcvnoCvcv",
		"CvcvCvcvCvcvno",
		"CvccnoCvcvCvcv",
		"CvccCvcvnoCvcv",
		"CvccCvcvCvcvno",
		"CvcvnoCvccCvcv",
		"CvcvCvccnoCvcv",
		"CvcvCvccCvcvno",
		"CvcvnoCvcvCvcc",
		"CvcvCvcvnoCvcc",
		"CvcvCvcvCvccno",
		"CvccnoCvccCvcv",
		"CvccCvccnoCvcv",
		"CvccCvccCvcvno",
		"CvcvnoCvccCvcc",
		"CvcvCvccnoCvcc",
		"CvcvCvccCvccno",
		"CvccnoCvcvCvcc",
		"CvccCvcvnoCvcc",
		"CvccCvcvCvccno",
	},
	"medium": {
		"CvcnoCvc",
		"CvcCvcno",
	},
	"basic": {
		"aaanaaan",
		"aannaaan",
		"aaannaaa",
	},
	"short": {
		"Cvcn",
	},
	"pin": {
		"nnnn",
	},
	"name": {
		"cvccvcvcv",
	},
	"phrase": {
		"cvcc cvc cvccvcv cvc",
		"cvc cvccvcvcv cvcv",
		"cv cvccv cvc cvcvccv",
	},
}

var MPW_PASSCHARS = map[byte]string{
	'V': "AEIOU",
	'C': "BCDFGHJKLMNPQRSTVWXYZ",
	'v': "aeiou",
	'c': "bcdfghjklmnpqrstvwxyz",
	'A': "AEIOUBCDFGHJKLMNPQRSTVWXYZ",
	'a': "AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz",
	'n': "0123456789",
	'o': "@&%?,=[]_:-+*$#!'^~;()/.",
	'x': "AEIOUaeiouBCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz0123456789!@#$%^&*()",
	' ': " ",
}
