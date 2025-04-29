from django.shortcuts import render

def xun_energy_home(request):
    context = {
        "title": "Xun Energy",
        "services": ["School Initiative", "Community Work Program", "Product and Service"],
    }
    return render(request, "XunEnergy/Energy.html", context)
