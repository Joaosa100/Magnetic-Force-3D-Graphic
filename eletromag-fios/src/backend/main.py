import numpy as np
import plotly.graph_objects as go
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["example"], # endereço fornecido pelo comando npm run dev
    allow_methods=["*"],
    allow_headers=["*"],
)

class Vetor(BaseModel):
    Fm: list[float]

@app.post("/plotar", response_class=HTMLResponse)
async def plotar_vetores(vetor: Vetor):
    Fm = np.array(vetor.Fm)
    modulo = np.linalg.norm(Fm)

    max_range = max(abs(Fm[0]), abs(Fm[1]), abs(Fm[2]))
    margin = max_range * 1.2 if max_range > 0 else 1

    fig = go.Figure()

    # 1. Esfera pequena na origem (partícula)
    fig.add_trace(go.Scatter3d(
        x=[0],
        y=[0],
        z=[0],
        mode='markers',
        marker=dict(size=6, color='red'),
        name='Partícula (origem)',
        hoverinfo='skip'  # não mostra tooltip na esfera
    ))

    # 2. Linha da haste (corpo da seta)
    fig.add_trace(go.Scatter3d(
        x=[0, Fm[0]],
        y=[0, Fm[1]],
        z=[0, Fm[2]],
        mode='lines',
        line=dict(color='green', width=6),
        name="Vetor Fm",
        hoverinfo='skip'  # evita tooltip na linha
    ))

    # 3. Ponta da seta (cone)
    cone_size = modulo * 0.2 if modulo > 0 else 1e-20
    fig.add_trace(go.Cone(
        x=[Fm[0]],
        y=[Fm[1]],
        z=[Fm[2]],
        u=[Fm[0]],
        v=[Fm[1]],
        w=[Fm[2]],
        sizemode="absolute",
        sizeref=cone_size,
        anchor="tip",
        showscale=False,
        colorscale=[[0, "green"], [1, "green"]],
        name="Ponta da seta",
        hovertemplate=(
            "FMx: %{x:.2e}<br>" +
            "FMy: %{y:.2e}<br>" +
            "FMz: %{z:.2e}<br>" +
            f"Fm resultante: {modulo:.2e} N<br>" +
            "<extra></extra>"  # remove info extra padrão
        )
    ))

    fig.update_layout(
        title="Vetor Força Magnética Resultante (Fm)",
        scene=dict(
            xaxis=dict(title="X", range=[-margin, margin]),
            yaxis=dict(title="Y", range=[-margin, margin]),
            zaxis=dict(title="Z", range=[-margin, margin]),
            aspectmode="cube"
        ),
        margin=dict(l=0, r=0, t=40, b=0)
    )

    return HTMLResponse(content=fig.to_html(full_html=True))
