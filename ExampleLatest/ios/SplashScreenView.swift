import SwiftUI

struct AppLogo: View {
  private let size = 432.0

  @State private var xOffsets: [CGFloat] = Array(repeating: 0, count: 6)
  @State private var yOffsets: [CGFloat] = Array(repeating: 0, count: 6)

  private func animateByIndex(idx: Int, x: CGFloat = 0.0, y: CGFloat = 0.0) {
    let duration = 0.8

    withAnimation(.smooth(duration: duration)) {
      xOffsets[idx] = x
      yOffsets[idx] = y
    }
  }

  var body: some View {
    GeometryReader { geometry in

      let scaleFactor = geometry.size.width / size

      ZStack {
        Color.clear

        Circle()
          .fill(Color(red: 1, green: 0, blue: 1))
          .opacity(0.5)
          .frame(width: 100 * scaleFactor, height: 100 * scaleFactor)
          .position(
            x: (166 + xOffsets[5]) * scaleFactor,
            y: (194 + yOffsets[5]) * scaleFactor
          ).onAppear { animateByIndex(idx: 5, x: 100, y: 44) }

        Circle()
          .fill(Color(red: 0, green: 0, blue: 1))
          .opacity(0.5)
          .frame(width: 100 * scaleFactor, height: 100 * scaleFactor)
          .position(
            x: (166 + xOffsets[4]) * scaleFactor,
            y: (238 + yOffsets[4]) * scaleFactor
          ).onAppear { animateByIndex(idx: 4, x: 100, y: -44) }

        Circle()
          .fill(Color(red: 0, green: 1, blue: 1))
          .opacity(0.5)
          .frame(width: 100 * scaleFactor, height: 100 * scaleFactor)
          .position(
            x: (216 + xOffsets[3]) * scaleFactor,
            y: (266 + yOffsets[3]) * scaleFactor
          ).onAppear { animateByIndex(idx: 3, x: 0, y: -100) }

        Circle()
          .fill(Color(red: 0, green: 1, blue: 0))
          .opacity(0.5)
          .frame(width: 100 * scaleFactor, height: 100 * scaleFactor)
          .position(
            x: (266 + xOffsets[2]) * scaleFactor,
            y: (238 + yOffsets[2]) * scaleFactor
          ).onAppear { animateByIndex(idx: 2, x: -100, y: -44) }

        Circle()
          .fill(Color(red: 1, green: 1, blue: 0))
          .opacity(0.5)
          .frame(width: 100 * scaleFactor, height: 100 * scaleFactor)
          .position(
            x: (266 + xOffsets[1]) * scaleFactor,
            y: (194 + yOffsets[1]) * scaleFactor
          ).onAppear { animateByIndex(idx: 1, x: -100, y: 44) }

        Circle()
          .fill(Color(red: 1, green: 0, blue: 0))
          .opacity(0.5)
          .frame(width: 100 * scaleFactor, height: 100 * scaleFactor)
          .position(
            x: (216 + xOffsets[0]) * scaleFactor,
            y: (166 + yOffsets[0]) * scaleFactor
          ).onAppear { animateByIndex(idx: 0, x: 0, y: 100) }
      }
    }
  }
}

struct SplashScreenView: View {
  var body: some View {
    ZStack {
      Color("SplashScreenBG").ignoresSafeArea()

      AppLogo()
        .aspectRatio(1, contentMode: .fit)
        .frame(
          width: UIScreen.main.bounds.width,
          height: UIScreen.main.bounds.height
        ).edgesIgnoringSafeArea(.all)
    }
  }
}

struct SplashScreenView_Previews: PreviewProvider {
  static var previews: some View {
    SplashScreenView()
  }
}
