import matplotlib
import matplotlib.pyplot as plt
import math

matplotlib.use('Qt5Agg')
fig, ax = plt.subplots()

def sin(deg):
    return math.sin(math.radians(deg))
def cos(deg):
    return math.cos(math.radians(deg))
def tan(deg):
    return math.tan(math.radians(deg))

# user adjustables:
theta = 42
u = 10
h = 1
g = 9.81

# initalisation:
x = []
y = []
x_now = 0
y_now = h

# Initial Sin/Cos Theta (reduce num of calcs):
ist = sin(theta)
ict = cos(theta)
itt = tan(theta)
Range = ( (u*u)/g ) * ( ist*ict + ict*math.sqrt( ist*ist + (2*g*h)/(u*u) ) )
x_step = (1/50) * Range

# print to user as useful info, not for graph:
total_time = Range / (u*ict)
x_apogee = ( (u*u)/g ) * ist*ict
y_apogee = h + ( (u*u)/(2*g) )*ist*ist
print(str(x_apogee) + "," + str(y_apogee))
print("Range: " + str(Range))

while (x_now <= Range):
    print("x: " + str(x_now) + ", y: " + str(y_now))
    x.append(x_now)
    y.append(y_now)

    x_now += x_step
    y_now = h + x_now*itt - ( (g/(2*u*u))*(1+itt*itt)*(x_now*x_now) )

ax.plot(x, y)
plt.show()
