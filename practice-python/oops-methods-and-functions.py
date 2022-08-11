class House:
    layout = 'square'
    def __init__(self, size, color='white'):
        self.size = size
        self.color = color
    def paint(self, color):
        self.color = color

# We can instantiate a `home` from the class object `House`
# (using our `__init__` method!) and resolve attributes.
home = House(1000)
print(home.size)  # 1000
print(home.color)  # white

# We can resolve attributes on the class object too.
print(House.layout)  # square
print(House.paint)  # <function House.paint(self, color)>


print(home.layout)  # square - everything looks normal
print(home.paint)  # <bound method House.paint of <House object at 0x...>> - what's this?!


# The method contains information about the referenced function and the bound instance object.
print(home.paint.__func__)  # <function House.paint(self, color)>
print(home.paint.__self__)  # <House at 0x...>
print(home.paint.__self__ is home)  # True


home.paint('red')
# is equivalent to
House.paint(home, 'red')

# The home's color is indeed changed after painting the home.
print(home.color)  # red