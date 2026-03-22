"""
Regenerates client/public/resume.pdf as a valid PDF (fixes corrupted exports).
Run from repo root: python scripts/generate_resume_pdf.py
"""
from pathlib import Path

from fpdf import FPDF

OUT = Path(__file__).resolve().parents[1] / "client" / "public" / "resume.pdf"


def main() -> None:
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.set_margins(20, 20, 20)
    pdf.add_page()

    # Header
    pdf.set_font("Helvetica", "B", 22)
    pdf.cell(0, 10, "Pramod Yadav", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(55, 55, 55)
    pdf.cell(
        0,
        7,
        "B.Tech Mathematics and Computing | Rajiv Gandhi Institute of Petroleum Technology (RGIPT)",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.ln(4)
    pdf.set_font("Helvetica", "", 10)
    line_h = 5
    pdf.set_text_color(40, 40, 40)
    pdf.cell(0, line_h, "GitHub: github.com/Prm01", link="https://github.com/Prm01", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(
        0,
        line_h,
        "LinkedIn: linkedin.com/in/pramod-yadav-7810b5299",
        link="https://www.linkedin.com/in/pramod-yadav-7810b5299/",
        new_x="LMARGIN",
        new_y="NEXT",
    )
    pdf.cell(0, line_h, "LeetCode: leetcode.com/u/PramodYadav1", link="https://leetcode.com/u/PramodYadav1/", new_x="LMARGIN", new_y="NEXT")
    pdf.set_text_color(0, 0, 0)
    pdf.ln(6)

    def section(title: str) -> None:
        pdf.set_font("Helvetica", "B", 12)
        pdf.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        pdf.set_font("Helvetica", "", 10)

    section("SUMMARY")
    pdf.multi_cell(
        0,
        5,
        "Full-stack developer focused on the MERN stack, machine learning, and AI. "
        "Experience building responsive web apps, REST APIs, and ML workflows. "
        "Active in campus tech communities (GDSC, GeeksForGeeks RGIPT).",
    )
    pdf.ln(2)

    section("EDUCATION")
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 5, "B.Tech - Mathematics and Computing", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 5, "Rajiv Gandhi Institute of Petroleum Technology (RGIPT), Jais, UP | 2023 - 2027", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(3)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 5, "Senior Secondary (Class XII) - PCM", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    pdf.cell(0, 5, "City Montessori Inter College, Lucknow, UP | 2021 - 2023", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)

    section("TECHNICAL SKILLS")
    pdf.multi_cell(
        0,
        5,
        "Languages: JavaScript, Python, C++, SQL | "
        "Web: React, Node.js, Express, MongoDB, REST APIs, HTML/CSS | "
        "Other: Machine Learning, Git, Linux",
    )
    pdf.ln(2)

    section("SELECTED PROJECTS")
    bullets = [
        "Air Quality Index (AQI) Prediction - ML with Random Forest, visualization, category mapping",
        "Doctor Appointment System - MERN, JWT auth, role-based dashboards, deployed on Render",
        "Portfolio Website - React, animations, dark/light mode, responsive layout",
        "Swiggy Clone - Live REST APIs, cart flow, mobile-first UI",
    ]
    for b in bullets:
        pdf.set_x(pdf.l_margin + 4)
        pdf.multi_cell(0, 5, f"- {b}")
    pdf.ln(2)

    section("EXPERIENCE AND LEADERSHIP")
    items = [
        "Design Executive, Google Developer Student Clubs - RGIPT (2023 - Present)",
        "Executive Member, GeeksForGeeks RGIPT Student Chapter (2023 - Present)",
        "Volunteer, Arpan - RGIPT Social Council (2023 - Present)",
    ]
    for it in items:
        pdf.set_x(pdf.l_margin + 4)
        pdf.multi_cell(0, 5, f"- {it}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
