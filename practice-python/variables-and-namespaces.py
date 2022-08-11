x = 5
print(x + 3)  # Prints 8.

x = "Hello"
print(x + " world!")  # Prints "Hello world!".


x = "hello world"
y = "hello " + "world"

x == y  # => True
x is y  # => False

id(x)  # => 4455464720
id(y)  # => 4455960848


x = "Hello, world!"
y = x



def compute(a, b, c):
    return (a + b) * c


compute(4, 1, 3)  # => 15
compute([1], [2, 3], 2) # => [1, 2, 3, 1, 2, 3]
compute('l', 'olo', 4)  # => 'lolololololololo'