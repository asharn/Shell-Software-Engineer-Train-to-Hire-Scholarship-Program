
# Oddities of the Interpreter
x = 5
print(x)
x
y = None
print(y)
y


# Breaking down bools
x = False
y = True
x
y
type(x)
type(y)
x or y
x and y
not x and y
x == True
x == 0
x == ""
x or 1/0
x and 1/0
y or 1/0
y and 1/0
id(x)
w = x
z = True
id(w) == id(x)
id(z) == id(y)


# Interrogating int and float
type(5)
5 == 5.0
5 is 5.0

# Scrutinizing str
s = "Hello"
s + ", world"
type(s)
id(s)
s += ", world"
id(s)
id(s) == "Hello, world"
