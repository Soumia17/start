# from matplotlib import pyplot as plt
# plt.plot(2,3, marker="o", color="red")
# plt.plot(1,4, marker="o", color="red")
# plt.plot(2,5, marker="o", color="red")
# plt.plot(3,6, marker="o", color="red")
# plt.plot(6,7, marker="o", color="red")
# plt.plot(2,2, marker="o", color="red")
# plt.axis('off')
# plt.show()


import numpy as np
import matplotlib.pyplot as plt
  
# initialize x and y coordinates
x = [0.1, 0.2, 0.3, 0.4, 0.5]
y = [6.2, -8.4, 8.5, 9.2, -6.3]
i=0
j=0
dis=[]
while i <len(x): 
    while j <len(x):
        # plt.plot(x[i], y[i], marker="*", color="red")
        dist = np.linalg.norm(x[i]-y[j])

        dis.append(dist)
        j=j+1
        print(dist)
    i=i+1    
print(dis)





# plt.axis('off')    
# plt.show()


# import tkinter as tk

# root = tk.Tk()

# txt = tk.Label(root, text="My First Tkinter App!")

# txt.pack()

# root.mainloop()